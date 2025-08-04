// Local Imports
import { AtheleteRepository } from './athelete.repository';
import { EventRepository } from './event.repository';

/**
 * Static references to domain repositories.
 */
export class DomainProvider {
  /**
   * Static references to domain repositories.
   * These repositories are used to manage domain entities.
   * They provide methods for CRUD operations and other domain-specific logic.
   */
  static readonly EventRepository: EventRepository = new EventRepository();
  static readonly AtheleteRepository: AtheleteRepository = new AtheleteRepository();
}
