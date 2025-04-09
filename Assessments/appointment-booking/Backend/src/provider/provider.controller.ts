import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto} from './provider.dto/createProvider.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/provider.guard';
import { UpdateDto } from './provider.dto/updateProvider.dto';
import { SearchQueryDto } from './provider.dto/searchQuery.dto';

@ApiTags('provider')
@Controller('api/provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new provider' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Search Provider by Id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '760af731-5b98-4b95-a89b-e7f65c67e172',
  })
  @ApiResponse({
    status: 200,
    description: 'Provider fetched successfully',
  })
  @ApiOperation({ summary: 'Search by id' })
  async findOne(@Param('id',ParseUUIDPipe) id: string,@Req() request:any) {
    return await this.providerService.findOne(id,request.user);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all providers' })
  @ApiResponse({
    status: 200,
    description: 'User fetch successfully',
  })
  async getAllProviders(@Query() searchQueryDto: SearchQueryDto,@Req() request:any) {
    return await this.providerService.getAllProviders(searchQueryDto);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'update Provider' })
  @ApiResponse({
    status: 200,
    description: 'Provider data updated successfully',
  })
  async update(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateDto,
    @Req() request: any,
  ) {
    return await this.providerService.update(id, updateDto, request.user);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient' })
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.providerService.remove(id);
  }
}
