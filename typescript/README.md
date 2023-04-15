__typescript__
```typescript
interface MyData {
  id: number;
  name: string;
}

class MyCollection<T extends MyData> {
  private items: T[] = [];

  constructor(private readonly baseUrl: string, private readonly resourceName: string) {}

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}/${this.resourceName}`);
    const data = await response.json();
    return data.items as T[];
  }

  async getById(id: number): Promise<T | undefined> {
    const response = await fetch(`${this.baseUrl}/${this.resourceName}/${id}`);
    if (!response.ok) {
      return undefined;
    }
    const data = await response.json();
    return data as T;
  }

  async add(item: T): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${this.resourceName}`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to add item to ${this.resourceName}`);
    }
  }

  async update(item: T): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${this.resourceName}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to update item in ${this.resourceName}`);
    }
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${this.resourceName}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Failed to delete item from ${this.resourceName}`);
    }
  }
}

class MyCollectionClient {
  constructor(private readonly baseUrl: string) {}

  getCollection<T extends MyData>(resourceName: string): MyCollection<T> {
    return new MyCollection<T>(this.baseUrl, resourceName);
  }
}

// Usage example:
const client = new MyCollectionClient('https://myapi.com');
const users = client.getCollection<MyData>('users');
const allUsers = await users.getAll();
const user = await users.getById(123);
const newUser = { id: 456, name: 'Jane Doe' };
await users.add(newUser);
newUser.name = 'Jane Smith';
await users.update(newUser);
await users.delete(456);

```
In this example, we have a TypeScript class called MyCollection that implements basic CRUD operations for a generic collection of items that implement the MyData interface. We also have a second class called MyCollectionClient that provides a factory method for creating instances of MyCollection for different resources.
The MyCollection class has a constructor that takes a base URL and a resource name as arguments, and defines several async methods for retrieving, adding, updating, and deleting items from the collection. The class uses generics to ensure that all items in the collection implement the MyData interface, and uses optional parameters and error handling to provide a robust and flexible API.
The MyCollectionClient class has a constructor that takes a base URL as an argument, and defines a single method that creates instances of MyCollection for different resources. This allows consumers of the class to easily create and interact with multiple collections from a single client object.
This is just an example of a TypeScript class, but it demonstrates how to use generics, interfaces, optional parameters, and error handling to create a powerful and flexible class with a clear

_fredrik (at) conva se_
