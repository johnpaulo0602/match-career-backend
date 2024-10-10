# Use a imagem oficial do Node.js
FROM node:20

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências de produção (omitindo as dependências de desenvolvimento)
RUN npm install --omit=dev

# Copiar todo o código da aplicação
COPY . .

# Gerar o Prisma Client
RUN npx prisma generate

# Definir a variável de ambiente DATABASE_URL diretamente
ENV DATABASE_URL="${{ MongoDB.MONGO_URL }}"

# Aplicar as mudanças no banco de dados (equivalente a npx prisma db push)
RUN npx prisma db push

# Construir a aplicação (gerar os arquivos para produção)
RUN npm run build

# Expor a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação no modo de produção
CMD ["npm", "run", "start:prod"]
