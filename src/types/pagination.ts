export type PaginationDto = {
  page?: number;
  limit?: number;
};

export type Meta = {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type Pagination<Data> = {
  data: Data[];
  meta: Meta;
};
