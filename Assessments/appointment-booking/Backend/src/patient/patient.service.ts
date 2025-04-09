import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePatientDto } from './patient.dto/createPatient.dto';
import { UpdatePatientDto } from './patient.dto/updatePatient.dto';
import { PrismaClient } from '@prisma/client';
import { SearchPatientQueryDto } from './patient.dto/searchPatientQuery.dto';

@Injectable()
export class PatientService {
  constructor(
    private prisma: PrismaClient,
    private logger: Logger,
  ) {
    this.logger = new Logger(PatientService.name);
  }

  async create(createPatientDto: CreatePatientDto) {
    try {
      const patientFind = await this.prisma.patient.findUnique({
        where: {
          email: createPatientDto.email,
        },
      });

      if (patientFind) {
        this.logger.error('Email already exist');
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      if (createPatientDto.providerId) {
        const isProviderAvailable = await this.prisma.provider.findUnique({
          where: {
            id: createPatientDto.providerId,
          },
        });

        if (!isProviderAvailable) {
          this.logger.error('Provider not found');
          throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);
        }
      }

      const patientData = await this.prisma.patient.create({
        data: createPatientDto,
      });
      const { createdAt, updatedAt, isDeleted, ...details } = patientData;
      return {
        status: HttpStatus.OK,
        message: 'created successfully',
        result: details,
      };
    } catch (error) {
      this.logger.error(`${error}`);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const patient = await this.prisma.patient.findUnique({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          gender: true,
          contactNo: true,
          dateOfBirth: true,
          remark: true,
          address: true,
          provider: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          appointments: {
            omit: {
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!patient) {
        this.logger.error('patient not found');
        throw new HttpException('patient not found', HttpStatus.NOT_FOUND);
      }
      return {
        status: HttpStatus.OK,
        message: 'Data fetch successfully',
        result: patient,
      };
    } catch (error) {
      this.logger.error(`${error}`);
      throw error;
    }
  }

  async getAllPatients(
    searchPatientQueryDto: SearchPatientQueryDto,
    request: any,
  ) {
    try {
      const patient: any = {};
      if (
        request.userRole.toLowerCase() === 'provider' &&
        searchPatientQueryDto.providerId != request.userId
      ) {
        this.logger.error(`Forbidden resource"`);
        throw new HttpException('You do not have permission to access this resource', HttpStatus.FORBIDDEN);
      }

      if (searchPatientQueryDto.providerId) {
        patient.providerId = searchPatientQueryDto.providerId;
      }
      if (searchPatientQueryDto.email) {
        patient.email = {
          contains: searchPatientQueryDto.email,
          mode: 'insensitive',
        };
      }
      if (searchPatientQueryDto.gender) {
        patient.gender = {
          equals: searchPatientQueryDto.gender,
          mode: 'insensitive',
        };
      }
      if (searchPatientQueryDto.firstName) {
        patient.firstName = {
          contains: searchPatientQueryDto.firstName,
          mode: 'insensitive',
        };
      }
      const skip =
        (searchPatientQueryDto.page - 1) * searchPatientQueryDto.limit;
      const take = searchPatientQueryDto.limit;
      let allRecords = await this.prisma.patient.count();
      if(patient.providerId){
        allRecords = await this.prisma.patient.count({
          where:{
            providerId:patient.providerId,
          }
        })
      }

      const getPatient = await this.prisma.patient.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        where: patient,
        omit: {
          createdAt: true,
          updatedAt: true,
          isDeleted: true,
        },
      });

      this.logger.debug(`patient found ${JSON.stringify(getPatient)}`);
      return {
        status: HttpStatus.OK,
        message: 'Data fatch successfully ',
        result: getPatient,
        page: searchPatientQueryDto.page,
        total: allRecords,
      };
    } catch (error) {
      this.logger.error(`Error is: ${error}`);
      throw error;
    }
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    try {
      const findPatient = await this.prisma.patient.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!findPatient) {
        this.logger.error('Patient not found ');
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      const findProvider = await this.prisma.provider.findUnique({
        where: {
          id: updatePatientDto.providerId,
          isDeleted: false,
        },
      });
      if (!findProvider) {
        this.logger.error('Provider not found ');
        throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);
      }
      if (updatePatientDto.email) {
        const conflictEmail = await this.prisma.patient.findUnique({
          where: {
            email: updatePatientDto.email,
          },
        });
        if (conflictEmail && conflictEmail.id != id) {
          this.logger.error('Email is already exist ');
          throw new HttpException(
            'Email is already exist',
            HttpStatus.CONFLICT,
          );
        }
      }
      const updatedPatient = await this.prisma.patient.update({
        where: {
          id,
          isDeleted: false,
        },
        data: updatePatientDto,
      });
      this.logger.log(`Successfully updated data`);
      this.logger.debug(updatedPatient);
      return { status: HttpStatus.OK, message: 'Successfully updated' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const isPatientAvailable = await this.prisma.patient.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });
      if (!isPatientAvailable) {
        this.logger.error('Patient not found ');
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }

        const today = new Date();
        today.setHours(0, 0, 0, 0); 
      
        const futureAppointments = await this.prisma.appointment.findMany({
          where: {
            patientId:id,
            date: {
              gte: today,
            },
          },
          select: {
            id: true,
            slotId: true,
          },
        });
      
        const appointmentIds = futureAppointments.map(a => a.id);
        this.logger.debug(`Patients future Appointment id's are `,appointmentIds);
        const slotIds = futureAppointments.map(a => a.slotId).filter(Boolean);
        this.logger.debug(`Patients future slots id's are `,slotIds);
   
        await this.prisma.appointment.deleteMany({
          where: {
            id: { in: appointmentIds },
          },
        });
      
        await this.prisma.slots.updateMany({
          where: {
            id: { in: slotIds },
          },
          data: {
            status: 'open',
          },
        });
      

      await this.prisma.patient.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
        },
      });

      this.logger.log('Deleted Successfully');
      return { status: HttpStatus.OK, message: 'Deleted Successfully' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
