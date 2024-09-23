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
                    <a href="index.html" data-type="index-link">mintegs-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-2b96f2e8a4994688383f332dbce973561d67f3a139e757a6d9051ae33781e33a697f226b48191935df3013b2710f55cbc90106e648abcfcc685f8e2303972694"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-2b96f2e8a4994688383f332dbce973561d67f3a139e757a6d9051ae33781e33a697f226b48191935df3013b2710f55cbc90106e648abcfcc685f8e2303972694"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-2b96f2e8a4994688383f332dbce973561d67f3a139e757a6d9051ae33781e33a697f226b48191935df3013b2710f55cbc90106e648abcfcc685f8e2303972694"' :
                                            'id="xs-controllers-links-module-AuthModule-2b96f2e8a4994688383f332dbce973561d67f3a139e757a6d9051ae33781e33a697f226b48191935df3013b2710f55cbc90106e648abcfcc685f8e2303972694"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-2b96f2e8a4994688383f332dbce973561d67f3a139e757a6d9051ae33781e33a697f226b48191935df3013b2710f55cbc90106e648abcfcc685f8e2303972694"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-2b96f2e8a4994688383f332dbce973561d67f3a139e757a6d9051ae33781e33a697f226b48191935df3013b2710f55cbc90106e648abcfcc685f8e2303972694"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-2b96f2e8a4994688383f332dbce973561d67f3a139e757a6d9051ae33781e33a697f226b48191935df3013b2710f55cbc90106e648abcfcc685f8e2303972694"' :
                                        'id="xs-injectables-links-module-AuthModule-2b96f2e8a4994688383f332dbce973561d67f3a139e757a6d9051ae33781e33a697f226b48191935df3013b2710f55cbc90106e648abcfcc685f8e2303972694"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EnvModule.html" data-type="entity-link" >EnvModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SessionsModule.html" data-type="entity-link" >SessionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SessionsModule-9b12b821886251dd2413a65746ac9b3115a757d09ecdc8ae42b237f4fcd67edd1385f8081b01a7cacd6f8dff0a4444597a1c969929bf6b37103f3f5460eb5b4b"' : 'data-bs-target="#xs-controllers-links-module-SessionsModule-9b12b821886251dd2413a65746ac9b3115a757d09ecdc8ae42b237f4fcd67edd1385f8081b01a7cacd6f8dff0a4444597a1c969929bf6b37103f3f5460eb5b4b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SessionsModule-9b12b821886251dd2413a65746ac9b3115a757d09ecdc8ae42b237f4fcd67edd1385f8081b01a7cacd6f8dff0a4444597a1c969929bf6b37103f3f5460eb5b4b"' :
                                            'id="xs-controllers-links-module-SessionsModule-9b12b821886251dd2413a65746ac9b3115a757d09ecdc8ae42b237f4fcd67edd1385f8081b01a7cacd6f8dff0a4444597a1c969929bf6b37103f3f5460eb5b4b"' }>
                                            <li class="link">
                                                <a href="controllers/SessionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SessionsModule-9b12b821886251dd2413a65746ac9b3115a757d09ecdc8ae42b237f4fcd67edd1385f8081b01a7cacd6f8dff0a4444597a1c969929bf6b37103f3f5460eb5b4b"' : 'data-bs-target="#xs-injectables-links-module-SessionsModule-9b12b821886251dd2413a65746ac9b3115a757d09ecdc8ae42b237f4fcd67edd1385f8081b01a7cacd6f8dff0a4444597a1c969929bf6b37103f3f5460eb5b4b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SessionsModule-9b12b821886251dd2413a65746ac9b3115a757d09ecdc8ae42b237f4fcd67edd1385f8081b01a7cacd6f8dff0a4444597a1c969929bf6b37103f3f5460eb5b4b"' :
                                        'id="xs-injectables-links-module-SessionsModule-9b12b821886251dd2413a65746ac9b3115a757d09ecdc8ae42b237f4fcd67edd1385f8081b01a7cacd6f8dff0a4444597a1c969929bf6b37103f3f5460eb5b4b"' }>
                                        <li class="link">
                                            <a href="injectables/SessionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-677a8ae05edf933a8973510c751e25034020e9fc11467f9c4f07aac4d811252bd66829122cca00adfd39c52455bbbb473d9b64d13ea8b91665682eac52bad7b9"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-677a8ae05edf933a8973510c751e25034020e9fc11467f9c4f07aac4d811252bd66829122cca00adfd39c52455bbbb473d9b64d13ea8b91665682eac52bad7b9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-677a8ae05edf933a8973510c751e25034020e9fc11467f9c4f07aac4d811252bd66829122cca00adfd39c52455bbbb473d9b64d13ea8b91665682eac52bad7b9"' :
                                            'id="xs-controllers-links-module-UsersModule-677a8ae05edf933a8973510c751e25034020e9fc11467f9c4f07aac4d811252bd66829122cca00adfd39c52455bbbb473d9b64d13ea8b91665682eac52bad7b9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-677a8ae05edf933a8973510c751e25034020e9fc11467f9c4f07aac4d811252bd66829122cca00adfd39c52455bbbb473d9b64d13ea8b91665682eac52bad7b9"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-677a8ae05edf933a8973510c751e25034020e9fc11467f9c4f07aac4d811252bd66829122cca00adfd39c52455bbbb473d9b64d13ea8b91665682eac52bad7b9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-677a8ae05edf933a8973510c751e25034020e9fc11467f9c4f07aac4d811252bd66829122cca00adfd39c52455bbbb473d9b64d13ea8b91665682eac52bad7b9"' :
                                        'id="xs-injectables-links-module-UsersModule-677a8ae05edf933a8973510c751e25034020e9fc11467f9c4f07aac4d811252bd66829122cca00adfd39c52455bbbb473d9b64d13ea8b91665682eac52bad7b9"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Session.html" data-type="entity-link" >Session</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddRelationshipToSessionAndUser1719672459617.html" data-type="entity-link" >AddRelationshipToSessionAndUser1719672459617</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddRoleToUser1719388025258.html" data-type="entity-link" >AddRoleToUser1719388025258</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddSessionEntity1719672378417.html" data-type="entity-link" >AddSessionEntity1719672378417</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link" >ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserEntity1719238220284.html" data-type="entity-link" >CreateUserEntity1719238220284</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistryDates.html" data-type="entity-link" >RegistryDates</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveDto.html" data-type="entity-link" >RemoveDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersSubscriber.html" data-type="entity-link" >UsersSubscriber</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginValidationMiddleware.html" data-type="entity-link" >LoginValidationMiddleware</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CustomAuth.html" data-type="entity-link" >CustomAuth</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomRequest.html" data-type="entity-link" >CustomRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Device.html" data-type="entity-link" >Device</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SessionWithCurrent.html" data-type="entity-link" >SessionWithCurrent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});