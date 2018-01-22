FROM telemark/docker-node-unoconv:8.9.4

WORKDIR /app
COPY . .

ENV HOSTNAME 0.0.0.0
ENV PORT 4000

RUN npm install

EXPOSE 4000

CMD ["start"]

ENTRYPOINT ["./unoconv-server"]
