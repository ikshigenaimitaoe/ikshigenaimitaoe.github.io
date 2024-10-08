// add.js

document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const mediaPreviewDiv = document.querySelector('.media-preview');
    const removeBtn = document.querySelector('.remove-preview-btn');
    
    if (file) {
        const fileURL = URL.createObjectURL(file);
        const fileType = file.type;

        // Clear previous preview
        mediaPreviewDiv.innerHTML = '';
        mediaPreviewDiv.appendChild(removeBtn);
        removeBtn.style.display = 'block';

        let mediaElement;

        // Check file type (image, video, or other types like PDFs)
        if (fileType.startsWith('image/')) {
            mediaElement = document.createElement('img');
            mediaElement.src = fileURL;
        } else if (fileType.startsWith('video/')) {
            mediaElement = document.createElement('video');
            mediaElement.src = fileURL;
            mediaElement.controls = true; // Add video controls
        } else if (fileType === 'application/pdf') {
            mediaElement = document.createElement('embed');
            mediaElement.src = fileURL;
            mediaElement.type = 'application/pdf';
        } else {
            alert('Unsupported file type.');
            return;
        }

        // Apply styles for media preview
        mediaElement.style.width = '100%';
        mediaElement.style.height = '100%';
        mediaElement.style.borderRadius = '20px';
        mediaPreviewDiv.style.marginLeft = '10px';
        mediaElement.style.cursor = 'pointer';
        mediaPreviewDiv.style.border = '2px solid #ff6600';

        mediaPreviewDiv.appendChild(mediaElement);

        // Add event listener to open the media in a new tab when clicked
        mediaElement.addEventListener('click', function() {
            window.open(fileURL, '_blank');
        });
    }

    // Remove preview on clicking the "Remove" button
    removeBtn.addEventListener('click', function() {
        mediaPreviewDiv.innerHTML = '';
        removeBtn.style.display = 'none';
        mediaPreviewDiv.style.marginLeft = '0';
        mediaPreviewDiv.style.border = 'none';
        document.getElementById('file-upload').value = ''; // Clear file input
    });
});
