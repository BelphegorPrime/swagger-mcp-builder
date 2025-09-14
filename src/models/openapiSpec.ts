export interface OpenAPISpec {
  version: string;
  paths: Record<string, any>;
  components?: Record<string, any>;
  info: Record<string, any>;
  servers?: Array<Record<string, any>>;
  security?: Array<Record<string, any>>;
  tags?: Array<Record<string, any>>;
}
