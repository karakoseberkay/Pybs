
# # Backend için .NET Core tabanlı Docker imajını kullanın
# FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS backend
# WORKDIR /app

# # Backend dosyalarını kopyala
# COPY ["pybs.backend/pybs.backend.api/pybs.backend.api.csproj", "pybs.backend/"]
# COPY ["pybs.backend/pybs.backend.sln", "pybs.backend/"]

# # Backend projelerini restore et
# RUN dotnet restore "pybs.backend/pybs.backend.api/pybs.backend.api.csproj"

# # Backend kodunu kopyala ve build et
# COPY ["pybs.backend/pybs.backend.api/", "pybs.backend/pybs.backend.api/"]
# WORKDIR /app/pybs.backend/pybs.backend.api
# RUN dotnet build "pybs.backend.api.csproj" -c Release -o /app/build

# Frontend için Node.js tabanlı Docker imajını kullanın
FROM node:18.16.1-alpine AS frontend
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Frontend kodunu kopyala ve build et
COPY ["pyps-frontend/", "./"]

# Gerekli bağımlılıkları kur
RUN npm install

RUN npm run build

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]

# Yeni aşama başlat
# FROM nginx:alpine
# COPY --from=frontend /app/.next /usr/share/nginx/html/.next
# COPY --from=frontend /app/node_modules /usr/share/nginx/html/node_modules
# COPY --from=frontend /app/package.json /usr/share/nginx/html/package.json
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
