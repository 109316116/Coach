<template>
    <section>
        <base-card>
            <header>
                <h2>Requests Received</h2>
            </header>
            <ul v-if="hasRequests">
                <request-item v-for="req in receivedRequests" :key="req.id" :email="req.email"
                    :message="req.message"></request-item>
            </ul>
            <h3 v-else>You haven't received any requests yet!</h3>
        </base-card>
        <router-link to="/requests">
            <div class="actions">
                <base-button>Choose another coach</base-button>
            </div>
        </router-link>
    </section>
</template>

<script>
import { mapActions } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
    components: {
        RequestItem,
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions('requests', ['fetchContact']),
    },
    computed: {
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        },
        receivedRequests() {
            return this.$store.getters['requests/requests'];
        },
    },
    mounted() {
        this.fetchContact(this.$route.params.id);
    }
}
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}

.actions {
    text-align: center;
}
</style>