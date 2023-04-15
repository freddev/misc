### crud webapp with vuejs fe, c# be, deployed to azure
how to create a crud web application with vuejs frontend and c# backend, deployed to azure

#### Prerequisites
- Visual Studio 2019 or later with the .NET Core cross-platform development workload installed
- Node.js and npm installed
- Vue CLI installed
- PostgreSQL database instance
- Azure account with an active subscription

#### Step 1: Create a new C# Web API project
1. Open Visual Studio and create a new project.
2. Select "ASP.NET Core Web Application" and click "Next".
3. Choose a name for your project and select a location to save it.
4. Select "API" as the project template and click "Create".
5. In the "Create a new ASP.NET Core web application" dialog, select ".NET Core" and "ASP.NET Core 3.1" as the runtime and framework versions respectively.
6. Choose "No Authentication" for the authentication type and click "Create".

#### Step 2: Set up PostgreSQL database connection
1. In the Solution Explorer, right-click on the project name and select "Add" -> "New Item".
2. Select "Data" in the left pane and "ADO.NET Entity Data Model" in the middle pane.
3. Choose a name for your data model and click "Add".
4. Select "EF Designer from database" and click "Next".
5. Click the "New Connection" button and enter your PostgreSQL server information.
6. Select your PostgreSQL database from the dropdown and click "OK".
7. Test the connection and click "OK".
8. Choose the tables you want to include in your data model and click "Finish".
9. In the Solution Explorer, expand the "Data" folder and open the ApplicationDbContext.cs file.
10. Replace the connection string with your PostgreSQL connection string. You can find this in the Azure portal by going to your PostgreSQL server and copying the connection string.

#### Step 3: Create the CRUD API
1. Right-click on the project name in the Solution Explorer and select "Add" -> "New Scaffolded Item".
2. Select "API" in the left pane and "API Controller with actions, using Entity Framework" in the middle pane.
3. Choose the model class you want to create the CRUD API for and select your data context class.
4. Choose the CRUD actions you want to generate and click "Add".
5. Repeat steps 1-4 for each model class you want to create a CRUD API for.
6. For example the following code could be generated:
      ```csharp
      public class CreateModel : PageModel
      {
        private readonly ApplicationDbContext _context;

        public CreateModel(ApplicationDbContext context)
        {
          _context = context;
        }

        public IActionResult OnGet()
        {
          return Page();
        }

        [BindProperty]
        public Product Product { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid)
          {
            return Page();
          }

          _context.Products.Add(Product);
          await _context.SaveChangesAsync();

          return RedirectToPage("./Index");
        }
      }

      public class DeleteModel : PageModel
      {
        private readonly ApplicationDbContext _context;

        public DeleteModel(ApplicationDbContext context)
        {
          _context = context;
        }

        [BindProperty]
        public Product Product { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
          if (id == null)
          {
            return NotFound();
          }

          Product = await _context.Products.FirstOrDefaultAsync(m => m.Id == id);

          if (Product == null)
          {
            return NotFound();
          }

          return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
          if (id == null)
          {
            return NotFound();
          }

          Product = await _context.Products.FindAsync(id);

          if (Product != null)
          {
            _context.Products.Remove(Product);
            await _context.SaveChangesAsync();
          }

          return RedirectToPage("./Index");
        }
      }

      public class DetailsModel : PageModel
      {
        private readonly ApplicationDbContext _context;

        public DetailsModel(ApplicationDbContext context)
        {
          _context = context;
        }

        public Product Product { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
          if (id == null)
          {
            return NotFound();
          }

          Product = await _context.Products.FirstOrDefaultAsync(m => m.Id == id);

          if (Product == null)
          {
            return NotFound();
          }
          return Page();
        }
      }

      public class EditModel : PageModel
      {
        private readonly ApplicationDbContext _context;

        public EditModel(ApplicationDbContext context)
        {
          _context = context;
        }

        [BindProperty]
        public Product Product { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
          if (id == null)
          {
            return NotFound();
          }

          Product = await _context.Products.FirstOrDefaultAsync(m => m.Id == id);

          if (Product == null)
          {
            return NotFound();
          }
          return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid)
          {
            return Page();
          }

          _context.Attach(Product).State = EntityState.Modified;

          try
          {
            await _context.SaveChangesAsync();
          }
          catch (DbUpdateConcurrencyException)
          {
            if (!ProductExists(Product.Id))
            {
              return NotFound();
            }
            else
            {
              throw;
            }
          }
          return RedirectToPage("./Index");
    }

    private bool ProductExists(int id)

   ```

#### Step 4: Create the Vue.js app
1. Open a terminal window and navigate to the directory where you want to create your Vue.js app.
2. Run the following command to create a new Vue.js app:
   ```
   vue create my-app
   cd my-app
   npm install vue-router axios
   ```
#### Step 5: Create the Vue.js components
1. In your Vue.js app directory, create a new folder called components.
2. Create a new Vue.js component for each CRUD operation you want to perform, for example component/ProductList.vue:
   ```vuejs
   <template>
     <div>
       <h2>Create Product</h2>
       <form @submit.prevent="createProduct">
         <div>
           <label for="name">Name:</label>
           <input type="text" id="name" v-model="newProduct.name">
         </div>
         <div>
           <label for="description">Description:</label>
           <input type="text" id="description" v-model="newProduct.description">
         </div>
         <div>
           <label for="price">Price:</label>
           <input type="number" id="price" v-model="newProduct.price">
         </div>
         <button type="submit">Create Product</button>
       </form>
     </div>
   </template>
   
   <script>
   import axios from "axios";
   
   export default {
     data() {
       return {
         newProduct: {
           name: "",
           description: "",
           price: 0,
         },
       };
     },
     methods: {
       createProduct() {
         axios.post("/api/products", this.newProduct).then((response) => {
           console.log(response);
           // Do something with response, such as displaying a success message
         });
       },
     },
   };
   </script>
   ```
#### Step 6: Set up Azure deployment
1. Go to the Azure portal and create a new Web App.
2. Choose a unique name and select your subscription and resource group.
3. Choose your preferred OS, runtime stack, and region.
4. Click on the "Review + create" button to review your settings and create the Web App.
#### Step 7: Set up Azure DevOps pipeline
1. Go to the Azure DevOps portal and create a new project.
2. Go to the "Pipelines" section and create a new pipeline.
3. Choose your code repository and select your branch.
4. Choose your pipeline type, for example, "Starter pipeline".
5. Choose your agent pool and configure your pipeline settings.
6. Add the following steps to your pipeline:
   - Restore NuGet packages
   - Build the C# solution
   - Publish the Vue.js app
   - Copy published files to artifact staging directory
   - Publish artifacts
7. Save and run your pipeline to verify that it works as expected.
#### Step 8: Configure Azure deployment in your pipeline
1. Go to the "Pipelines" section and open your pipeline.
2. Click on the "Edit" button to edit your pipeline.
3. Add the following steps to your pipeline:
   - Azure App Service deploy
   - Azure App Service manage
6. Configure the "Azure App Service deploy" step by setting the Azure subscription, App Service name, and package or folder path.
7. Configure the "Azure App Service manage" step by setting the Azure subscription and App Service name.
8. Save and run your pipeline to deploy your app to Azure.
#### Step 9: Configure database connection string in Azure
1. Go to the Azure portal and navigate to your Web App.
2. Click on the "Configuration" blade and add a new connection string.
3. Set the name to your database name, the value to your database connection string, and the type to "PostgreSQL".
4. Save the connection string.
#### Step 10: Configure app settings in Azure
1. Go to the Azure portal and navigate to your Web App.
2. Click on the "Configuration" blade and add the following app settings:
   - ASPNETCORE_ENVIRONMENT: Production
   - ConnectionStrings:DefaultConnection: Your database connection string
   - WEBSITE_NODE_DEFAULT_VERSION: Your Node.js version
   - WEBSITES_PORT: Your port number
3. Save the app settings.
#### Step 11: Verify your app in Azure
1. Go to the Azure portal and navigate to your Web App.
2. Click on the "Overview" blade to see your Web App's URL.
3. Open your Web App's URL in a web browser to verify that your app is running correctly.


_fredrik (at) conva se_