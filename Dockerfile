# Stage 1
# FROM node:16.14 as react-build
#FROM node:18.17.0 as react-build
# WORKDIR /app
# COPY . ./
# RUN npm install
# #RUN npm audit fix --force
# RUN npm run build
FROM node:18.17.0
# Step 2: Set the working directory
WORKDIR /app
 
# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./
 
# Step 4: Install dependencies
RUN npm install
 
# Step 5: Copy the rest of the application code
COPY . .
 
# Step 6: Build the React app for production
RUN npm run build
 
# Step 7: Install a static file server (e.g., serve)
RUN npm install -g serve
 
# Step 8: Expose the port the app will run on
EXPOSE 3000
 
# Step 9: Command to serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
 
 
# Stage 2 - the production environment
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=react-build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]