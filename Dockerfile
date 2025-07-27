# Stage 1: Build Angular
FROM node:20-alpine AS angular-builder

WORKDIR /app

COPY task-planner-ui/package*.json ./task-planner-ui/

WORKDIR /app/task-planner-ui

RUN npm install

COPY task-planner-ui .

RUN npm run build

# Stage 2: Build Spring Boot
FROM eclipse-temurin:17-jdk-jammy AS java-builder

WORKDIR /app

COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

RUN ./gradlew dependencies

COPY src ./src
COPY --from=angular-builder /app/task-planner-ui/dist/task-planner-ui/browser/ ./src/main/resources/static/

RUN ./gradlew bootJar -x copyAngularAssets

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY --from=java-builder /app/build/libs/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]