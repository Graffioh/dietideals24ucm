FROM --platform=linux/amd64 openjdk:21
VOLUME /tmp
COPY target/*.jar app.jar
COPY .env .env
ENTRYPOINT ["java","-jar","/app.jar"]