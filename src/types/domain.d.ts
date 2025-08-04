/**
 * Defines the structure of a query used to find documents in a database.
 * This interface can be extended to include specific query parameters as needed.
 */
export interface FindQuery {
  /**
   * Various parameters that can be used to filter the documents.
   * This can include fields like `name`, `email`, or any other relevant criteria.
   * Each key represents a field in the document, and the value is the value to match.
   *
   * @example
   * {
   *   name: 'John Doe',
   *   email: 'john.doe@example.com'
   * }
   */
  [key: string]: any;
}

/**
 * Defines the structure of a query used to update documents in a database.
 * This interface can be extended to include specific update parameters as needed.
 */
export interface UpdateQuery{
  /**
   * The fields to update in the document.
   * Each key represents a field in the document, and the value is the new value for that field.
   *
   * @example
   * {
   *   name: 'Jane Doe',
   *   email: '
   *   }
   */
  [key: string]: any;
}
