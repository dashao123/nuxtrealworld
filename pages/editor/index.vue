<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-10 col-md-offset-1 col-xs-12">
                    <form>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Post Title">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea class="form-control" rows="8"
                                placeholder="Write your post (in markdown)"></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control" type="text" placeholder="Enter tags">
                            
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            Create Post
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware:'authenticated',
    name: 'EditorIndex'
    
}
</script>

<style scoped lang="scss">

</style>
