# NgxMonkeyUi

NgxMonkeyUi is an Angular components and functionalities library under development.

## Author

- [Kevin J. Rodríguez Morales](https://kevinrodriguez.es) [@SrPepeR](https://github.com/SrPepeR)

## Installation

To install NgxMonkeyUi, you have two options:

- Using npm:
  1. Run the following command in your Angular project:

    ```bash
    npm install ngx-monkey-ui
    ```

- Downloading built files:
  1. Go to the [GitHub repository releases page](https://github.com/SrPepeR/ng-monkey-ui/releases).
  2. Download your preferred version (latest version recommended).
  3. Extract the downloaded files into your Angular project.
  4. In your tsconfig.json file, add the following under the "compilerOptions" tag:

   ```json
   "paths": {
      "ngx-monkey-ui": [
        "{{your ngx-monkey-ui parent folder}}/ngx-monkey-ui"
      ]
    },
   ```

## Usage

To use the NgxMonkeyUi library in your Angular project, follow these steps:

1. Import the necessary modules in your app module:

  ```typescript
  import { NgxMonkeyUiModule } from 'ngx-monkey-ui';

  @NgModule({
    imports: [
     // ...
     NgxMonkeyUiModule
    ],
    // ...
  })
  export class AppModule { }
  ```

2. Use the components and functionalities provided by NgxMonkeyUi in your templates:

  ```html
  <monkey-menu></monkey-menu>
  <monkey-button></monkey-button>
  <!-- ... -->
  ```

3. Customize the styles of the NgxMonkeyUi components by adding your own CSS classes, using the provided CSS variables, or adding any MonkeyStyle to the component tag.

4. Build and run your Angular project to see the NgxMonkeyUi components in action.

## Documentation

<!-- For detailed documentation on how to use NgxMonkeyUi, refer to the [official documentation](https://github.com/SrPepeR/ng-monkey-ui/wiki). -->

Detailed documentation in next versions...

## Support

If you encounter any issues or have any questions, feel free to open an issue on the [GitHub repository](https://github.com/SrPepeR/ng-monkey-ui/issues).

## License

The NgxMonkeyUi library is released under the MIT License. See the [LICENSE](https://github.com/SrPepeR/ng-monkey-ui/blob/main/LICENSE) file for more details.
