// Local Imports
import { AthleteRepository } from './athlete.repository';
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
  static readonly AthleteRepository: AthleteRepository = new AthleteRepository();
  static readonly EventRepository: EventRepository = new EventRepository();
}
