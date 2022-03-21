'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@pie-mall/service documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="请输入查询关键字"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>入门指南</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>概述
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>手册
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>依赖项
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>属性列表
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">模块列表</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-3d322365e33a3e0e0f690931266cc69e86bf18f17cb56c8716c10e99f2fbff01b34e8580e5c4339cbc1fae0eb032315aeb333a6927a55dbf688f41d49311262e"' : 'data-target="#xs-controllers-links-module-AuthModule-3d322365e33a3e0e0f690931266cc69e86bf18f17cb56c8716c10e99f2fbff01b34e8580e5c4339cbc1fae0eb032315aeb333a6927a55dbf688f41d49311262e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3d322365e33a3e0e0f690931266cc69e86bf18f17cb56c8716c10e99f2fbff01b34e8580e5c4339cbc1fae0eb032315aeb333a6927a55dbf688f41d49311262e"' :
                                            'id="xs-controllers-links-module-AuthModule-3d322365e33a3e0e0f690931266cc69e86bf18f17cb56c8716c10e99f2fbff01b34e8580e5c4339cbc1fae0eb032315aeb333a6927a55dbf688f41d49311262e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-3d322365e33a3e0e0f690931266cc69e86bf18f17cb56c8716c10e99f2fbff01b34e8580e5c4339cbc1fae0eb032315aeb333a6927a55dbf688f41d49311262e"' : 'data-target="#xs-injectables-links-module-AuthModule-3d322365e33a3e0e0f690931266cc69e86bf18f17cb56c8716c10e99f2fbff01b34e8580e5c4339cbc1fae0eb032315aeb333a6927a55dbf688f41d49311262e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3d322365e33a3e0e0f690931266cc69e86bf18f17cb56c8716c10e99f2fbff01b34e8580e5c4339cbc1fae0eb032315aeb333a6927a55dbf688f41d49311262e"' :
                                        'id="xs-injectables-links-module-AuthModule-3d322365e33a3e0e0f690931266cc69e86bf18f17cb56c8716c10e99f2fbff01b34e8580e5c4339cbc1fae0eb032315aeb333a6927a55dbf688f41d49311262e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoodsModule.html" data-type="entity-link" >GoodsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-GoodsModule-b0dee32a54334042b45e0ab5d232326b6a7a47d0318cc8b9b062474df39da1e296607fb2ded417dee55a12cae1fe99cf1055495dd57be880962e356f778db514"' : 'data-target="#xs-controllers-links-module-GoodsModule-b0dee32a54334042b45e0ab5d232326b6a7a47d0318cc8b9b062474df39da1e296607fb2ded417dee55a12cae1fe99cf1055495dd57be880962e356f778db514"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GoodsModule-b0dee32a54334042b45e0ab5d232326b6a7a47d0318cc8b9b062474df39da1e296607fb2ded417dee55a12cae1fe99cf1055495dd57be880962e356f778db514"' :
                                            'id="xs-controllers-links-module-GoodsModule-b0dee32a54334042b45e0ab5d232326b6a7a47d0318cc8b9b062474df39da1e296607fb2ded417dee55a12cae1fe99cf1055495dd57be880962e356f778db514"' }>
                                            <li class="link">
                                                <a href="controllers/GoodsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoodsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GoodsModule-b0dee32a54334042b45e0ab5d232326b6a7a47d0318cc8b9b062474df39da1e296607fb2ded417dee55a12cae1fe99cf1055495dd57be880962e356f778db514"' : 'data-target="#xs-injectables-links-module-GoodsModule-b0dee32a54334042b45e0ab5d232326b6a7a47d0318cc8b9b062474df39da1e296607fb2ded417dee55a12cae1fe99cf1055495dd57be880962e356f778db514"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GoodsModule-b0dee32a54334042b45e0ab5d232326b6a7a47d0318cc8b9b062474df39da1e296607fb2ded417dee55a12cae1fe99cf1055495dd57be880962e356f778db514"' :
                                        'id="xs-injectables-links-module-GoodsModule-b0dee32a54334042b45e0ab5d232326b6a7a47d0318cc8b9b062474df39da1e296607fb2ded417dee55a12cae1fe99cf1055495dd57be880962e356f778db514"' }>
                                        <li class="link">
                                            <a href="injectables/GoodsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoodsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JwtAuthModule.html" data-type="entity-link" >JwtAuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-JwtAuthModule-cfa1d978ac05fbcab0beb9c8913a2d321f06d00d33e1b65a8e4a37dc28c6e4c1f5b92a39e9031b7efae15baa3340576d603d82541f7dd47264f886bb7e7e8d76"' : 'data-target="#xs-injectables-links-module-JwtAuthModule-cfa1d978ac05fbcab0beb9c8913a2d321f06d00d33e1b65a8e4a37dc28c6e4c1f5b92a39e9031b7efae15baa3340576d603d82541f7dd47264f886bb7e7e8d76"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JwtAuthModule-cfa1d978ac05fbcab0beb9c8913a2d321f06d00d33e1b65a8e4a37dc28c6e4c1f5b92a39e9031b7efae15baa3340576d603d82541f7dd47264f886bb7e7e8d76"' :
                                        'id="xs-injectables-links-module-JwtAuthModule-cfa1d978ac05fbcab0beb9c8913a2d321f06d00d33e1b65a8e4a37dc28c6e4c1f5b92a39e9031b7efae15baa3340576d603d82541f7dd47264f886bb7e7e8d76"' }>
                                        <li class="link">
                                            <a href="injectables/JwtAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResponseModule.html" data-type="entity-link" >ResponseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ResponseModule-716d8702402cd842b8850bf90d03812ea584726dbb50061591840cab5197b6c6f7883354e69c0feb4ab3f19ae85cdfad744e84bf5aaf57bbe8e43bac9feb9490"' : 'data-target="#xs-injectables-links-module-ResponseModule-716d8702402cd842b8850bf90d03812ea584726dbb50061591840cab5197b6c6f7883354e69c0feb4ab3f19ae85cdfad744e84bf5aaf57bbe8e43bac9feb9490"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResponseModule-716d8702402cd842b8850bf90d03812ea584726dbb50061591840cab5197b6c6f7883354e69c0feb4ab3f19ae85cdfad744e84bf5aaf57bbe8e43bac9feb9490"' :
                                        'id="xs-injectables-links-module-ResponseModule-716d8702402cd842b8850bf90d03812ea584726dbb50061591840cab5197b6c6f7883354e69c0feb4ab3f19ae85cdfad744e84bf5aaf57bbe8e43bac9feb9490"' }>
                                        <li class="link">
                                            <a href="injectables/ErrorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-97011b1e4be9f700bb64eb317ae05a711b487a82fc0d521b682f91277d5a523b35b029a4af0f20f6b0b1469e4d6e64ac2ff23808979a3efb9bbdfe533beb6926"' : 'data-target="#xs-controllers-links-module-UserModule-97011b1e4be9f700bb64eb317ae05a711b487a82fc0d521b682f91277d5a523b35b029a4af0f20f6b0b1469e4d6e64ac2ff23808979a3efb9bbdfe533beb6926"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-97011b1e4be9f700bb64eb317ae05a711b487a82fc0d521b682f91277d5a523b35b029a4af0f20f6b0b1469e4d6e64ac2ff23808979a3efb9bbdfe533beb6926"' :
                                            'id="xs-controllers-links-module-UserModule-97011b1e4be9f700bb64eb317ae05a711b487a82fc0d521b682f91277d5a523b35b029a4af0f20f6b0b1469e4d6e64ac2ff23808979a3efb9bbdfe533beb6926"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-97011b1e4be9f700bb64eb317ae05a711b487a82fc0d521b682f91277d5a523b35b029a4af0f20f6b0b1469e4d6e64ac2ff23808979a3efb9bbdfe533beb6926"' : 'data-target="#xs-injectables-links-module-UserModule-97011b1e4be9f700bb64eb317ae05a711b487a82fc0d521b682f91277d5a523b35b029a4af0f20f6b0b1469e4d6e64ac2ff23808979a3efb9bbdfe533beb6926"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-97011b1e4be9f700bb64eb317ae05a711b487a82fc0d521b682f91277d5a523b35b029a4af0f20f6b0b1469e4d6e64ac2ff23808979a3efb9bbdfe533beb6926"' :
                                        'id="xs-injectables-links-module-UserModule-97011b1e4be9f700bb64eb317ae05a711b487a82fc0d521b682f91277d5a523b35b029a4af0f20f6b0b1469e4d6e64ac2ff23808979a3efb9bbdfe533beb6926"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GoodsController.html" data-type="entity-link" >GoodsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>实体</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Admin.html" data-type="entity-link" >Admin</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Goods.html" data-type="entity-link" >Goods</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Guest.html" data-type="entity-link" >Guest</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ReceivingAddress.html" data-type="entity-link" >ReceivingAddress</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserProfile.html" data-type="entity-link" >UserProfile</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>类列表</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddGoodsDto.html" data-type="entity-link" >AddGoodsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/addGuestDto.html" data-type="entity-link" >addGuestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignDto.html" data-type="entity-link" >SignDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>可注入的</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/checkClientMiddleware.html" data-type="entity-link" >checkClientMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorService.html" data-type="entity-link" >ErrorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoodsService.html" data-type="entity-link" >GoodsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthService.html" data-type="entity-link" >JwtAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseService.html" data-type="entity-link" >ResponseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>接口</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/TypeOrmModuleOptions.html" data-type="entity-link" >TypeOrmModuleOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>其他</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">枚举列表</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">函数</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">变量</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>文档概览</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        文档生成使用 <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});