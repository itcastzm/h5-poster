const express = require('express')
const { Router } = require('express')
const bodyParser = require('body-parser');
const router = Router();
import { API } from "../utils";

// http://git.itcast.cn/api/v4/projects/641/repository/commits
// http://git.itcast.cn/api/v4/projects/641/repository/commits/4a092d98ed7af808ec7c9d14d4e9770b91aae983
// http://git.itcast.cn/api/v4/projects/641/repository/contributors
// http://git.itcast.cn/api/v4/groups/320/projects
// http://git.itcast.cn/40/003/blob/master/index.js
// http://git.itcast.cn/api/v4/groups?per_page=100
// gitlab api 文档
// http://git.itcast.cn/help/api/README.md

/* GET users listing. */
router.post('/token', async function (req, res, next) {
    console.log(req.body);
    let { username, password, group } = req.body;

    if (username && password && group) {
        // 获取token
        let data = await API.post("/oauth/token", {
            grant_type: "password",
            username,
            password
            // password: "zhumin123456"
        });
        res.json(data)
    } else {
        res.json({
            code: '10005',
            msg: 'git用户名、密码、组名不能为空！',
            data: null
        })
    }


});

// 获取当前用户所属的群组列表
router.post('/group/list', async function (req, res, next) {
    let { token } = req.body;
    if (token) {
        // 获取所有的项目
        // http://git.itcast.cn/api/v4/projects
        let data = await API({
            method: "get",
            url: "/api/v4/groups",
            responseType: "json",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.json(data);
    } else {
        res.json({
            code: '10005',
            msg: '登录信息失效，请重新登录',
            data: null
        });
    }
    // const id = parseInt(req.params.id)
});

// 320 group下所有项目列表
// http://git.itcast.cn/api/v4/groups/320/projects
// let gProjects = await Api.get(`/api/v4/groups/${320}/projects`, {
// let gProjects = await Api({
//   method: "get",
//   url: `/api/v4/groups/${320}/projects`,
//   responseType: "json",
//   headers: {
//     Authorization: `Bearer ${data.access_token}`
//   }
// });
// 获取组内的项目列表
router.post('/group/projects/list', async function (req, res, next) {
    let { token, group } = req.body;
    if (token && group) {
        let curGroup = null;
        let groups = await API({
            method: "get",
            url: `/api/v4/groups?per_page=100&owned=true`,
            responseType: "json",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log('groups', groups);
        if (groups && groups.length) {
            groups.forEach((v, i, a) => {
                if (v.name === group || v.path === group) {
                    curGroup = v;
                }
            });
        }

        if (curGroup && curGroup.id) {
            // 获取所有的项目
            // http://git.itcast.cn/api/v4/projects
            let data = await API({
                method: "get",
                // url: "/api/v4/projects",
                url: `/api/v4/groups/${curGroup.id}/projects`,
                responseType: "json",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // 遍历每个项目的代码贡献情况

            // let projectC = await Api({
            //   method: "get",
            //   // url: `/api/v4/projects/${641}/repository/contributors`,
            //   url: `/api/v4/projects/641/repository/contributors`,
            //   responseType: "json",
            //   headers: {
            //     Authorization: `Bearer ${data.access_token}`
            //   }
            // });

            let result = [];
            if (data && data.length) {
                for (let project of data) {
                    let contributors = await API({
                        method: "get",
                        url: `/api/v4/projects/${project.id}/repository/contributors`,
                        responseType: "json",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    result.push({
                        ...project, contributors
                    });
                }
                res.json(result);
            }

        } else {
            res.json({
                status: 'success',
                msg: '不存在符合的群组',
                data: null
            });
        }

    } else {
        res.json({
            code: '10005',
            msg: '登录信息失效，请重新登录',
            data: null
        });
    }
    // const id = parseInt(req.params.id)
});




// Create express instnace
const app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Require API routes
// const users = require('./routes/users')
// Import API Routes
app.use(router)

module.exports = app;