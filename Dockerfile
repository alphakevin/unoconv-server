FROM telemark/docker-node-unoconv:10.13.0

WORKDIR /app
COPY . .

ENV HOSTNAME 0.0.0.0
ENV PORT 4000

RUN yarn && yarn cache clean

EXPOSE 4000

CMD ["start"]

ENTRYPOINT ["./unoconv-server"]
