<template>
    <div>
        Hello World
        <div v-if="post">
            {{post.title}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['post']
}
</script>