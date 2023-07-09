import Router from "koa-router";
import settingService from "../services/setting.service";
import userService from "../services/user.service";

const router = new Router({
    prefix: "/info"
});

router.get('/types', async (ctx) => {
    /*	
        #swagger.tags = ['Info']
        #swagger.summary = 'Get types'
    */
    const settingTypes = await settingService.getSettingTypes()
    const roleTypes = await userService.getRoleTypes()
    ctx.body = {
        "settingTypes": settingTypes,
        "roleTypes": roleTypes
    }
})


export default router