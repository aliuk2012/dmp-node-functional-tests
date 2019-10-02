# docker run \
#   --cap-add=SYS_ADMIN \
#   --init \
#   --rm \
#   -v /dev/shm:/dev/shm \
#   -v $(pwd):/app \
#   digitalmarketplace/e2e-tests \
#   npm test -- --ci
FROM node:10-slim

# Based on https://github.com/GoogleChrome/puppeteer/blob/93843592da58efcb28cf740dd7dbfa9f04061fc8/docs/troubleshooting.md#running-puppeteer-in-docker

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Add user so we don't need --no-sandbox.
RUN groupadd -r user && useradd -r -u 2000 -g user -G audio,video user \
    && mkdir -p /home/user/Downloads \
    && chown -R user:user /home/user

RUN mkdir -p /app && chown -R user:user /app
WORKDIR /app

# Run everything after as non-privileged user.
USER user

COPY package.json package-lock.json ./

# Install jest and puppeteer so it's available in the container.
RUN npm ci

COPY jest.config.js ./
COPY __tests__ ./__tests__

CMD ["npm", "test", "--", "--ci"]
