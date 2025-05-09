#!/bin/bash

# Gerar o cliente Prisma
npx prisma generate

# Resetar o banco de dados e aplicar as migrações
npx prisma migrate reset --force

# Aplicar as migrações pendentes
npx prisma migrate deploy

# Verificar o status das migrações
npx prisma migrate status 