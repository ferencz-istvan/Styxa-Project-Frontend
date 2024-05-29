<!-- <template>
  <form @submit.prevent="uploadImage">
    <input type="file" @change="handleFileInput" />
    <button type="submit">Upload</button>
  </form>
</template>
<script setup>
import { ref } from 'vue'

const fileInput = ref(null)
const selectedFile = ref(null)

function handleFileInput(event) {
  selectedFile.value = event.target.files[0]
}

function uploadImage() {
  const formData = new FormData()
  formData.append('image', selectedFile.value)

  fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Image uploaded successfully:', data)
    })
    .catch((error) => {
      console.error('Error uploading image:', error)
    })
}
</script>
 -->
