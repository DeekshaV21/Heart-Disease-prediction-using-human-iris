const model = await tf.loadGraphModel('tfjs_model/model.json');

document.getElementById('image').addEventListener('change', async function (e) {

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async function (e) {
        document.getElementById('uploaded-image').src = e.target.result;
        document.getElementById('uploaded-image').style.display = 'block';


        const img = document.createElement('img');
        img.src = e.target.result;
  
  
        console.log(model)
  
        const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 224;
          canvas.height = 224;
  
          ctx.drawImage(img, 0, 0, 224, 224);
  
          const imageData = ctx.getImageData(0, 0, 224, 224);
          const imageTensor = tf.browser.fromPixels(imageData);
  
        //   const normalizedImage = imageTensor.div(255.0);
         const  normalizedImage = imageTensor.cast("float32")
  
          const reshapedImage = normalizedImage.expandDims(0);
  
          const predictions = model.predict(reshapedImage);
  
          // Process predictions
          console.log(predictions.arraySync()[0]);
  
  
          const max = Math.max(...predictions.arraySync()[0]);
  
          console.log("Index of maximum value:", predictions.arraySync()[0].indexOf(max))

          const predictionResult = predictions.arraySync()[0].indexOf(max) == 1 ? 'Heart Disease Detected' : 'No Heart Disease Detected';

          document.getElementById('prediction-result').textContent = predictionResult;
          document.getElementById('prediction-result').style.display = 'block';




    }









    // reader.readAsDataURL(file);
});


document.getElementById('image').addEventListener('change', async function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = async function (e) {
      // Display the uploaded image
      document.getElementById('uploaded-image').src = e.target.result;
      document.getElementById('uploaded-image').style.display = 'block';
  
      // Create an image element from the uploaded file
      const img = document.createElement('img');
      img.src = e.target.result;
  
      // Create a canvas to resize the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 224;
      canvas.height = 224;
      ctx.drawImage(img, 0, 0, 224, 224);

      document.getElementById('inv').appendChild(canvas);
  
      // Get image data from the canvas
      const imageData = ctx.getImageData(0, 0, 224, 224);
      console.log(imageData)
  
      // Create a tensor from the image data
      const imageTensor = tf.browser.fromPixels(imageData);
      const normalizedImage = imageTensor.cast("float32");
      const reshapedImage = normalizedImage.expandDims(0);
  
      // Make predictions using the pre-trained model
      const predictions = model.predict(reshapedImage);
      console.log(predictions.arraySync()[0]);
  
      // Find the index of the maximum value in the predictions
      const max = Math.max(...predictions.arraySync()[0]);
      console.log("Index of maximum value:", predictions.arraySync()[0].indexOf(max));
  
      // Display the prediction result
      const predictionResult = predictions.arraySync()[0].indexOf(max) === 1 ? 'Heart Disease Detected' : 'No Heart Disease Detected';
      document.getElementById('prediction-result').textContent = predictionResult;
      document.getElementById('prediction-result').style.display = 'block';
    }
  
    reader.readAsDataURL(file);
  });
