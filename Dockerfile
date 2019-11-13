FROM cppspark/evaluator:0.2.1

WORKDIR /.cpp-evaluation-action

RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs

COPY src src
COPY @types @types
COPY tsconfig.json package.json package-lock.json ./

RUN npm install -g typescript
RUN npm install

RUN tsc

ENTRYPOINT NODE_PATH=/.cpp-evaluation-action/node_modules node /.cpp-evaluation-action/build/main.js
# python /app/src/main.py .
