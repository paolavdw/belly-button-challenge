// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    /// get the metadata field
    let metadata = data.metadata;   
    ///   return metadata.id; 
    /// Filter the metadata for the object with the desired sample number    
    let sample_id = metadata.filter(item => item.id === parseInt(sample));
   /// Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata'); 
    // Use `.html("") to clear any existing metadata
    panel.html("");
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.  
    for (let i = 0; i < sample_id.length; i++) { 
      let x = sample_id[i];
      panel.append("p").text(`ID: ${x.id}`);
      panel.append("p").text(`ETHNICITY: ${x.ethnicity}`);
      panel.append("p").text(`GENDER: ${x.gender}`);
      panel.append("p").text(`AGE: ${x.age}`);
      panel.append("p").text(`LOCATION: ${x.location}`);
      panel.append("p").text(`BBTYPE: ${x.bbtype}`);
      panel.append("p").text(`WFREQ: ${x.wfreq}`)    
      
      /// to check if filtering is working  
    // console.log(sample_id[i]);
   };
  });
 }
/// to check if buildMetadata function is working  
///buildMetadata(940)

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    /// Get the samples field
    let samples_field = data.samples;     
    /// to check if filtering is working 
    ///console.log(samples_field)
    
    /// Filter the samples for the object with the desired sample number 
    let sample_data = samples_field.filter(item => item.id === sample);
    /// to check the code is working  
    // console.log(sample_data[0])

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sample_data[0].otu_ids;
    let otu_labels = sample_data[0].otu_labels;
    let sample_values = sample_data[0].sample_values;
    /// to check if filtering is working 
    ///console.log(otu_ids, otu_labels, sample_values);    
    
    let bubbleContent = 'bubble';
 
    // Build a Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: "Earth"
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {
        title: 'OTU ID'
      },
      yaxis: {
        title: 'Number of Bacteria'
      },
      showlegend: false,
      height: 600,
      width: 1200
    };
        
    // Render the Bubble Chart
    Plotly.newPlot(bubbleContent, data, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let y_ticks_string = otu_ids.map(String);
    let y_ticks = y_ticks_string.map(id => `OTU ${id}`).slice(0, 10);
        /// to check if the code is working 
    ///console.log(y_ticks)
    
    /// Build a Bar Chart
    let barContent = 'bar';
 
    var data = [
      {
        x: sample_values.slice(0, 10).sort(function compareFunction (firstNum, secondNum) {
          return firstNum - secondNum;
        }),
        y: y_ticks.reverse(),
        type: 'bar',
        text: y_ticks,
        orientation: 'h'
      }
    ];

    var layout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {
        title: 'Number of Bacteria'
      },
      
      showlegend: false,
      height: 400,
      width: 700
    }   

  // Don't forget to slice and reverse the input data appropriately
  // these steps were done in lines 88 & 100

    // Render the Bar Chart
    Plotly.newPlot(barContent, data, layout);
  });
}
/// to check if buildCharts function is working  
///buildCharts(940)

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    /// Get the names field
    let names = data.names;  
    /// Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select('#selDataset'); 

    // Use the list of sample names to populate the select options
    /// Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((sample_names) => {
      dropdown.append("option")
      .text(sample_names)
      .attr('value', sample_names)
    });

    // Get the first sample from the list
    let first_sample = names[0];      
     // Build charts and metadata panel with the first sample          
    buildMetadata (first_sample);
    buildCharts (first_sample);
    
    });
}

// Function for event listener
function optionChanged(newSample) {
  
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata (newSample);
  buildCharts (newSample);
  
}

// Initialize the dashboard
init();