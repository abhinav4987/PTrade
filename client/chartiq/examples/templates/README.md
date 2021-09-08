This folder contains sample web pages that demonstrate the use of the charting library.

===================================================================================================================
Please note that depending on your package, not all these sample templates will be fully functional for you.
If you require the additional components necessary for one of these templates, please contact your account manager.
===================================================================================================================

The following ready-to-use files are provided:

- **sample-template-basic.html**:
  A basic implementation with a chart and some UI controls.

- **sample-template-active-trader.html**:
  A basic implementation with all the tools needed to successfully trade from the chart.

- **sample-template-institutional.html**:
  A basic implementation with a chart, some UI controls, time span event markers, and a projected volume study.

- **sample-template-term-structure.html**:
  A basic implementation with a chart that displays term structure data.

- **sample-template-options.html**:
  A basic implementation with a chart, some UI controls, and an option sentiment study.

- **sample-template-advanced.html**:
  A feature-rich implementation with most of the advanced charting capabilities enabled.

- **sample-template-instant-chart.html**:
  An implementation showcasing how to load an entire advanced chart in a single web component.

- **sample-template-multi-charts.html**:
  An implementation of multiple charts, each one having its own UI controls.

- **sample-template-chart-grid.html**:
  An implementation of multiple charts using a single set of UI controls (located in the **chart-grid** subfolder).

To use one of the above template files, copy it to the root directory of the library package.

There are also two subfolders in this folder:

- **partials**

   Contains the following files:
   - _sample-template-advanced-context.html_ -- The HTML portion of the _sample-template-advanced.html_ file
   - _sample-template-cross-section-context.html_ -- The HTML portion of the _sample-template-term-structure.html_ file

   These files are useful for constructing your own application page using a bundling tool such as Webpack (see the Webpack example provided in this package).

   You won't need them if you are creating your page from the sample pages included in the **templates** folder.

- **chart-grid**

   Contains the chart grid sample template which demonstrates the use of multiple synchronized charts on the same page.
