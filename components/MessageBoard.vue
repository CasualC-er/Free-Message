<script setup>
const { session, update } = await useSession();
if (!session.value) {
  await update({
    username: "",
    userid: -1,
    access: false,
  });
}
let username = session.value["username"];
console.log(username);
</script>
<template>
  <div>
    <h1>Communal Board</h1>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <span class="username">{{ message.username }}:</span>
        <div class="message-container">
          <div class="message-content">
            <span class="body">{{ message.body }}</span>
            <span class="timestamp">{{ message.timestamp }}</span>
          </div>

          <button
            class="delete-button"
            v-if="username === message.username || username === 'admin'"
            @click="deleteMessage(message.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
  <div class="message-form">
    <textarea v-model="new_message" placeholder="Type your message"></textarea>
    <button @click="postMessage">Post Message</button>
  </div>
  <button @click="refresh_messages">Refresh</button>
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
  async mounted() {
    const response = await $fetch("/api/board/messages");
    this.messages = response;
  },
  methods: {
    async postMessage() {
      const { session } = await useSession();
      const timestamp = this.formatTimestamp(Date());
      const newPost = {
        id: this.messages.length + 1,
        username: session.value.username,
        body: this.new_message,
        timestamp: timestamp,
      };
      await $fetch("/api/board/messages", {
        method: "POST",
        body: {
          userid: session.value.userid,
          username: session.value.username,
          body: this.new_message,
          timestamp: timestamp,
        },
      });
      this.messages.push(newPost);
      this.newMessage = "";
    },
    async deleteMessage(id) {
      await $fetch("/api/board/messages", {
        method: "DELETE",
        body: {
          message_id: id,
        },
      });
      this.messages = this.messages.filter((message) => message.id !== id);
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
    async refresh_messages() {
      const response = await $fetch("/api/board/messages");
      this.messages = response;
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
.delete-button {
  background-color: #ff0000; /* Red background */
  color: white; /* White text */
  border: none; /* No border */
  padding: 5px 10px; /* Some padding */
  text-align: center; /* Centered text */
  text-decoration: none; /* No underline */
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer; /* Mouse pointer on hover */
  border-radius: 4px; /* Rounded corners */
  order: 2;
  margin-left: auto;
}

.delete-button:hover {
  background-color: #cc0000; /* Darker red when hovered */
}
.message-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}
.message-content {
  width: calc(100% - 50px);
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
  word-wrap: break-word;
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
  display: flex;
  margin-bottom: 20px;
}
</style>
