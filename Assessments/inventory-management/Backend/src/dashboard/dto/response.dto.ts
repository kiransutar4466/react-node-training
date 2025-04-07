import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { ResponseFindSingleVendorDto } from "src/vendors/dto/response.dto";

export class ResponseFindProductsStats {
  @ApiProperty({ example: 4 })
  totalProducts: number;

  @ApiProperty({ example: 100 })
  totalSales: number;

  @ApiProperty({ example: 10 })
  salesThisMonth: number;
}

export class ResponseFindCategoriesSoldCountDto {
  @ApiProperty({ example: "Electronics" })
  category: string;

  @ApiProperty({ example: 10 })
  soldCount: number;
}

export class ResponseFindSalesPerMonthForCurrentYearDto {
  @ApiProperty({ example: "Jan" })
  month: string;

  @ApiProperty({ example: 500 })
  totalSales: number;
}

export class AdditionalFindBestSellersDto {
  @ApiProperty({ example: 4 })
  soldCount: number;
}

export class ResponseFindBestSellersDto extends IntersectionType(
  ResponseFindSingleVendorDto,
  AdditionalFindBestSellersDto,
) {}

export class ResponseDashboardDto {
  @ApiProperty({ example: 15 })
  totalInventory: number;

  @ApiProperty({ type: ResponseFindProductsStats })
  productStats: ResponseFindProductsStats;

  @ApiProperty({ type: [ResponseFindCategoriesSoldCountDto] })
  categoryWiseSoldCount: ResponseFindCategoriesSoldCountDto[];

  @ApiProperty({ type: [ResponseFindSalesPerMonthForCurrentYearDto] })
  salesPerMonthForCurrentYear: ResponseFindSalesPerMonthForCurrentYearDto[];

  @ApiProperty({ type: [ResponseFindBestSellersDto] })
  bestSellers: ResponseFindBestSellersDto[];
}
