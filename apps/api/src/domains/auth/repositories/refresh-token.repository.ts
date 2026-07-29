// import { inject } from '@loopback/core'
// import { IDataSource, RefreshToken, TInsertable } from '../../../database'

// export class RefreshTokenRepository {
//   constructor(
//     @inject(`db`)
//     private dataSource: IDataSource,
//   ) {}

//   create(data: TInsertable<RefreshToken>) {
//     return this.dataSource.insertInto('refreshToken').values(data).execute()
//   }

//   findOne(query: { where: { refreshToken: string; userId: string } }) {
//     return this.dataSource
//       .selectFrom('refreshToken')
//       .select(['userId', 'refreshToken'])
//       .where('refreshToken', '=', query.where.refreshToken)
//       .executeTakeFirst()
//   }

//   deleteRefreshToken(userId: number) {
//     return this.dataSource
//       .deleteFrom('refreshToken')
//       .where('userId', '=', userId.toString())
//       .execute()
//   }
// }
