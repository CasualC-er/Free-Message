<template>
  <div>
    <h1>Communal Board</h1>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <span class="username">{{ message.username }}:</span>
        <div class="message-container">
          <span class="body">{{ message.body }}</span>
          <span class="timestamp">{{ message.timestamp }}</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="message-form">
    <textarea v-model="new_message" placeholder="Type your message"></textarea>
    <button @click="postMessage">Post Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      new_message: "",
    };
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        },
      ],
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await $fetch("/api/board/messages");
        this.messages = response;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async postMessage() {
      const { session, refresh, reset, remove, update } = await useSession();
      const timestamp = this.formatTimestamp(Date());
      const newPost = {
        id: this.messages.length + 1,
        username: session.value.username,
        body: this.new_message,
        timestamp: timestamp,
      };

      this.messages.push(newPost);
      this.newMessage = "";
    },
    formatTimestamp(timestamp) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      return new Date(timestamp).toLocaleString("en-US", options);
    },
  },
};
</script>
<style scoped>
textarea {
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
}

button {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
}
.message-container {
  display: flex;
  justify-content: space-between;
}
body {
  font-family: "Inter", sans-serif;
}

/* Style the list items */
li {
  list-style-type: none;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f5f5f5;
}

/* Style the username */
.username {
  font-weight: bold;
  color: #3498db; /* or any color of your choice */
}

/* Style the message body */
.body {
  margin-left: 2vw;
  margin-top: 5px;
  color: #333;
}

/* Style the timestamp */
.timestamp {
  margin-top: 1vw;
  margin-left: auto;
  font-size: 0.8em;
  color: #888;
}
.message-form {
  .message-form {
    display: flex;
    margin-bottom: 20px;
  }
}
</style>
