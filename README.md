# E-commerce back-end

**Free hosting use for deployment**


 ## Fonctionnalities
 - Create account
 - Display products
 - Display products details, name, description, images, price & quantity in stock
 - Add product to card (for verified users)
 - Make payment (for verified users)
 - Add comments and notes to products (for verified users)

 For the admin:
 - Create an admin account
 - Add, Edit, Delete products
 
 <br />
 
 ## Technology Used   
 - Nodejs
 - Mongodb
 - Express

<br />

 ## Setup MongoDB

 1. Install Docker engine on your machine
 2. Run `docker run -p27020:27017 --name mongo-container mongo:5.0.16`
    This will start a container with the name "mongo-container" maped on port 27017
 3. Install mongo compass and connect to mongo-container on port 27020


 ## Step to Start Project
 
 1. `git clone https://github.com/LoickAdjiwanou/e-commerce.git`
 2. `cd e-commerce-backend`
 3. `npm i`
 4. `npm run data:import`
 5. `npm run dev`

 Before running 4, check /backend/models/Product.js, an important note is added. 

 ##
 1. In the file endpoints.txt: endpoints of the project
 2. In classes.txt, classes of the models used
**NEXT UPDATE** :
Payment modules

<br />

**NOTE** : Stuck ?... then contact me on LinkedIn (www.linkedin.com/in/loick-adjiwanou)

#### If you like project then feel free to give Star...
