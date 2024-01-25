FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
ARG PROJECT_VERSION=0.0.0
ARG VERSION_SUFFIX=""
# build application
COPY ./ /build
WORKDIR /build
ENV SKIP_SPA_BUILD=true
RUN dotnet publish \
    --configuration Release \
    --output /app \
    --runtime linux-musl-x64 \
    /p:PublishSingleFile=true \
    /p:VersionPrefix=$PROJECT_VERSION /p:VersionSuffix=$VERSION_SUFFIX

FROM node:21-alpine AS frontend
WORKDIR /app
COPY ./ClientApp/package*.json .
COPY ./ClientApp/.npmrc .
RUN npm ci
COPY ./ClientApp .
RUN npm run build

# final stage/image
FROM mcr.microsoft.com/dotnet/runtime-deps:8.0-alpine-amd64 as final
WORKDIR /app
COPY --from=build /app .
COPY --from=frontend /app/build ./wwwroot
ENTRYPOINT ["./AspNetCoreReactVite"]
