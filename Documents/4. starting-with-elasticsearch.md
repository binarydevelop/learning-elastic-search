## Starting with elasticsearch
Suppose that we have an ecommerce application running on a web server.

The data is stored within a database, such as the product categories and the products themselves. So when a product page is requested, the web application looks up the product within the database, renders the page, and sends it back to the visitor’s browser.

Now we want to improve the search functionality on the website because so far, it has just been using the database for this.
But that’s not what databases are really good at.

we decided to go with Elasticsearch, because that seems to be the best tool for the job.

<span style="color: yellow; font-size: 18px">
How do we integrate it with our current architecture?
</span>

The easiest way, is to communicate with Elasticsearch from our application. So when someone enters a search query on our website, a request is sent to the web application, which then sends a search query to Elasticsearch.

This can be done with a plain HTTP request, but typically we will use one of the client
libraries that are provided for all popular programming languages.

When the application receives a response, it can process it and send the results back to the browser.

<span style="color: yellow; font-size: 18px">
How do we get data into Elasticsearch in the first place, and how do we keep it updated?
</span>
Whenever a new product is added or updated, we should add or update the product within
Elasticsearch too, apart from within the database.
So essentially we’ll duplicate some of our data.
