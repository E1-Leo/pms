<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        height: 100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: auto;
        background: #fff;
        border-radius: 4px;
         height: 80%;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
     
    }
    .layout-logo-left{
        width: 90%;
        height: 60px;
        line-height: 60px;
        font-size: 28px;
        text-align: center;
      /*  background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;*/
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .ivu-row-flex{
        height: 100%;
    }
.userinfo{
    display: inline-block;
    float: right;
}
.userinfo .ivu-dropdown{
    margin-top: 50px;
}
 .ivu-dropdown {
    margin-right: 25px;
    margin-top: 22px;
}
.ivu-menu-submenu-title{
    padding: 14px;
}

.head-img {
    width: 100%;
    height: 60px;
    line-height: 60px;
    float: right;
    margin-top: -50px;
}
.head-img img{
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    width: 40px;
    height: 40px;
    float: right;
}

 
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <i-col span="5" class="layout-menu-left">
                <Menu theme="dark" style="width: 100%;" :active-name="this.$route.path" :open-names="openNames" @on-select="mennuSelect">
                    <div class="layout-logo-left">
                        <span class="layout-text" style="color: rgba(255, 255, 255, 0.7);"> 人事管理系统</span>
                    </div>
                    <template v-for="(item, index) in $router.options.routes">
                        <template v-if="!item.hidden">
                            <Submenu :key="index" :name="item.name" v-if="!item.leaf">
                                <template slot="title">
                                    <span class="layout-text">{{ item.name }}</span>
                                </template>
                                <template v-for="(child, index) in item.children">
                                    <Menu-item :key="index" :name="child.path">{{ child.name }}</Menu-item>
                                </template>
                            </Submenu>
                            <template v-if=" item.leaf && item.children.length > 0 ">
                                <Menu-item :key="index" :name="item.children[0].path">
                                    <span class="layout-text" >{{ item.children[0].name }}</span>
                                </Menu-item>
                            </template>
                        </template>
                        
                    </template>
                </Menu>
            </i-col>
            <i-col span="19">
                <div class="layout-header">
                    <div class="userinfo">
                      <Dropdown placement="bottom-end">
                        <span class="head-img">
                            {{ curUserName }}
                            <img src="../assets/user.jpg">
                        </span>
                        <Dropdown-menu slot="list">
                            <Dropdown-item @click.native="modifyPassWord()">修改密码</Dropdown-item>
                            <Dropdown-item  @click.native="logout()" divided>退出</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>{{ $route.name }}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                     </div>
                </div>
            </i-col>
        </Row>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                openNames: [this.$route.matched[0].name],
                curUserName: 'name'
            }
        },
        computed: {

        },
        methods: {
            mennuSelect( name ) {
                this.$router.push( { path : name } );
            },
            logout() {
                this.$router.push('/login');
            },
            modifyPassWord() {
                this.modal1 = true;
            },
            comfirmModifyPS() {
                return false;
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                         this.modal1 = false;
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                        return false;
                    }
                })
            },
            cancel() {
                this.modal1 = false;    
                this.$Message.info('点击了取消');
            },
        }
    }
</script>
<style scoped>
.ivu-select-dropdown .ivu-dropdown {
     margin: 0px 12px 0px 0px; 
}
._dropdownList{
   /*  width: 100%;
    text-align: center; */
}
._iconCls{
    width: 56px;
    text-align: center;
}
</style>
