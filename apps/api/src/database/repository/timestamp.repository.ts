import {
  DataObject,
  DefaultCrudRepository,
  juggler,
  Options,
  Where,
  Count,
} from '@loopback/repository'
import { BaseEntity } from '../models/base.entity'

export class TimestampingRepository<
  T extends BaseEntity,
  ID,
  IRelations extends object = object,
> extends DefaultCrudRepository<T, ID, IRelations> {
  constructor(
    public entityClass: typeof BaseEntity & { prototype: T },
    public dataSource: juggler.DataSource,
  ) {
    super(entityClass, dataSource)
    // TODO: check whether the model has updatedAt/createdAt properties?
  }

  async create(entity: DataObject<T>, options?: Options): Promise<T> {
    entity.createdAt = new Date()
    entity.updatedAt = new Date()
    return super.create(entity, options)
  }

  async updateAll(
    data: DataObject<T>,
    where?: Where<T>,
    options?: Options,
  ): Promise<Count> {
    data.updatedAt = new Date()
    return super.updateAll(data, where, options)
  }

  async replaceById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    data.updatedAt = new Date()
    return super.replaceById(id, data, options)
  }

  async updateById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    data.updatedAt = new Date()
    return super.updateById(id, data, options)
  }
}
