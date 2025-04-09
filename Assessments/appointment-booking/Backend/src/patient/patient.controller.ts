import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './patient.dto/createPatient.dto';
import { UpdatePatientDto } from './patient.dto/updatePatient.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard} from 'src/guard/provider.guard';
import { SearchPatientQueryDto } from './patient.dto/searchPatientQuery.dto';

@ApiTags('Patient')
@Controller('api/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Patient' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Search Patient by Id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '0a9d181f-5e58-4637-ba2a-90ac41807307',
  })
  @ApiResponse({
    status: 200,
    description: 'patient fetched successfully',
  })
  @ApiOperation({ summary: 'Search by id' })
  async findOne(@Param('id',ParseUUIDPipe) id: string) {
    return await this.patientService.findOne(id);
  } 

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Patients' })
  @ApiResponse({
    status: 200,
    description: 'User fetch successfully',
  })
 
  async getAllPatients(
   
    @Query() searchPatientQueryDto : SearchPatientQueryDto,@Req() request:any
  ) {
    return await this.patientService.getAllPatients(
      searchPatientQueryDto,request.user
    );
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'update Patient' })
  @ApiResponse({
    status: 200,
    description: 'Patient data updated successfully',
  })
  async update(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return await this.patientService.update(id, updatePatientDto);
  }

 
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient' })
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.patientService.remove(id);
  }
}
