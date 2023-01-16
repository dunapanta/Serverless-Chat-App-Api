
## Messaging App Clase 1 Adding multiple DynamoDB GSIs
- Para consultar todos lo usuarios de un grupo o todos los grupos de un usuario
- En `dynamodb.ts` second global secondary index en `AttributeDefinitions`
```
 {
          AttributeName: 'pk2',
          AttributeType: 'S',
        },
        {
          AttributeName: 'sk2',
          AttributeType: 'S',
        },
```

- En `dynamodb.ts` second global secondary index en `GlobalSecondaryIndexes`
```
 {
          IndexName: 'index2',
          KeySchema: [
            {
              AttributeName: 'pk2',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'sk2',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
```
- En `serverless.ts` en `iamRoleStatements` necesitamos agregar permisos de lectura y escritura para `index2`
```
'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.singleTable}/index/index2',
```
