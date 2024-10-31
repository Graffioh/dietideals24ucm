FROM --platform=linux/amd64 amazoncorretto:23
VOLUME /tmp
COPY target/*.jar app.jar
COPY .env .env
ENTRYPOINT ["java","-jar","/app.jar"]