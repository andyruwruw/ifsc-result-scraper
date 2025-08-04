// Local Imports
import {
  FindQuery,
  UpdateQuery,
} from '../types/domain';

/**
 * Repository class for managing a collection of items.
 * Provides methods to perform CRUD operations on the items.
 *
 * @template T - The type of items stored in the repository.
 */
export class Repository<T> {
  /**
   * The items stored in the repository.
   */
  protected _items: Record<string, T> = {};

  /**
   * Counts the total number of items in the repository.
   *
   * @returns A promise that resolves to the count of items.
   */
  count(): Promise<number>{
    return Promise.resolve(Object.keys(this._items).length);
  }

  /**
   * Clears all items from the repository.
   *
   * @returns {Promise<number>} A promise that resolves to the number of cleared items.
   */
  clear(): Promise<number> {
    const count = Object.keys(this._items).length;
    this._items = {};
    return Promise.resolve(count);
  }

  /**
   * Deletes an item from the repository by their unique identifier.
   *
   * @returns {Promise<number>} A promise that resolves to the number of deleted items.
   */
  delete(query: FindQuery): Promise<number> {
    const items = this._filter(query);
    const size = items.length;

    if (size === 0) {
      return Promise.resolve(0);
    }

    for (const item of items) {
      const id = (item as any).id;
      if (id && this._items[id]) {
        delete this._items[id];
      }
    }

    return Promise.resolve(size);
  }

  /**
   * Deletes an item based on the provided query.
   *
   * @param {FindQuery} query - The query object containing search criteria for items.
   * @returns {Promise<boolean>} A promise that resolves to true if the item was deleted, or false if not found.
   */
  deleteOne(query: FindQuery): Promise<boolean> {
    const item = this._filter(query).shift();

    if (!item) {
      return Promise.resolve(false);
    }

    const id = (item as any).id;

    if (id && this._items[id]) {
      delete this._items[id];
    }

    return Promise.resolve(true);
  }

  /**
   * Deletes an item by its unique identifier.
   *
   * @param {string} id - The unique identifier of the item to be deleted.
   * @returns {Promise<boolean>} A promise that resolves to true if the item was deleted, or false if not found.
   */
  deleteById(id: string): Promise<boolean> {
    return this.deleteOne({ id });
  }

  /**
   * Finds items based on the provided query.
   *
   * @param {FindQuery} query - The query object containing search criteria for items.
   * @param {number} [offset] - The offset for pagination, defaults to 0.
   * @param {number} [limit] - The maximum number of items to return, defaults to 10.
   * @returns {Promise<T[]>} A promise that resolves to an array of items matching the query.
   */
  find(
    query: FindQuery,
    offset?: number,
    limit?: number
  ): Promise<T[]> {
    const items = this._filter(query);

    if (offset !== undefined) {
      items.splice(0, offset);
    }

    if (limit !== undefined) {
      items.splice(limit);
    }

    return Promise.resolve(items);
  }

  /**
   * Finds a item by its unique identifier.
   *
   * @param {string} id - The unique identifier of the item.
   * @returns {Promise<T | null>} A promise that resolves to the item if found, or null if not found.
   */
  findById(id: string): Promise<T | null> {
    const item = this._items[id];
    return Promise.resolve(item || null);
  }

  /**
   * Finds a single item based on the provided query.
   *
   * @param {FindQuery} query - The query object containing search criteria for a item.
   * @returns {Promise<T | null>} A promise that resolves to the item if found, or null if not found.
   */
  findOne(query: FindQuery): Promise<T | null> {
    const item = this._filter(query).shift();
    return Promise.resolve(item || null);
  }

  /**
   * Saves a item to the repository.
   *
   * @param {T} T - The item entity to be saved.
   * @returns {Promise<T | null>} A promise that resolves to the saved item.
   */
  save(T: T): Promise<T | null> {
    const id = (T as any).id;

    if (!id) {
      throw new Error('Item must have an \'id\' property to be saved.');
    }

    this._items[id] = T;
    return Promise.resolve(this._items[id]);
  }

  /**
   * Updates a item in the repository.
   *
   * @param {FindQuery} query - The query object containing search criteria for the item.
   * @param {UpdateQuery} update - The item entity with updated information.
   * @returns {Promise<T | null>} A promise that resolves to the updated item.
   */
  update(
    query: FindQuery,
    update: UpdateQuery,
  ): Promise<T | null> {
    const item = this._filter(query).shift();

    if (!item) {
      return Promise.resolve(null);
    }

    const updatedItem = {
      ...item,
      ...update,
    };

    this._items[(item as Record<string, any>).id] = updatedItem;
    return Promise.resolve(updatedItem);
  }

  /**
   * Updates multiple items in the repository based on the provided query.
   *
   * @param {FindQuery} query - The query object containing search criteria for items.
   * @param {UpdateQuery} update - The item entity with updated information.
   * @returns A promise that resolves to the number of updated items.
   */
  updateMany(
    query: FindQuery,
    update: UpdateQuery,
  ): Promise<number> {
    const items = this._filter(query);
    const updatedItems = items.map((item) => {
      const updatedItem = {
        ...item,
        ...update,
      };
      this._items[(item as Record<string, any>).id] = updatedItem;
      return updatedItem;
    });
    return Promise.resolve(updatedItems.length);
  }

  /**
   * Filters items based on the provided query.
   *
   * @param {FindQuery} query - The query object containing search criteria for items.
   * @returns {T[]} An array of items that match the query.
   */
  _filter(query: FindQuery): T[] {
    if (Object.keys(query).length === 0) {
      return Object.values(this._items);
    }

    if ('id' in query && query.id) {
      return [this._items[query.id]];
    }

    return Object.values(this._items).filter((item: T) => {
      return Object.keys(query).every((key: string) => {
        return (item as Record<string, any>)[key] === query[key];
      });
    });
  }
}