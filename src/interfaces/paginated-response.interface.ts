export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
}
