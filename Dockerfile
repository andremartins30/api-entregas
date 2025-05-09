# Estágio de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de configuração
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY prisma ./prisma

# Instalar dependências
RUN yarn install --immutable

# Copiar código fonte
COPY . .

# Gerar o Prisma Client
RUN yarn prisma generate

# Build da aplicação
RUN yarn build

# Estágio de produção
FROM node:20-alpine

WORKDIR /app

# Copiar apenas os arquivos necessários
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Expor a porta
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["yarn", "start"] 