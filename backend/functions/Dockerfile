FROM mcr.microsoft.com/azure-functions/node:4-node18

# Copy function app files
COPY . /home/site/wwwroot

# Install dependencies
RUN cd /home/site/wwwroot && npm install --production 