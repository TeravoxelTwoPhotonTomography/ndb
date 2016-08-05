/// <reference path="../../../../shared/client/services/brainAreaService.ts"/>
/// <reference path="../../../../shared/client/services/injectionService.ts"/>
/// <reference path="../../../../shared/client/services/neuronService.ts"/>
/// <reference path="../../../../shared/client/services/sampleService.ts"/>
/// <reference path="../../../../shared/client/services/mouseStrainService.ts"/>
/// <reference path="../../../../shared/client/services/structureIdentifierService.ts"/>
/// <reference path="../../../../shared/client/services/tracingNodeService.ts"/>
/// <reference path="../../../../shared/client/services/tracingService.ts"/>
/// <reference path="../../../../shared/client/services/registrationTransformService.ts"/>
/// <reference path="../../../../shared/client/services/injectionVirusService.ts"/>


'use strict';

class ApiAccessService {
    public static $inject = [
        '$resource',
        '$location',
        'injectionVirusService',
        'injectionService',
        'sampleService',
        'neuronService',
        'tracingService',
        'tracingNodeService',
        'structureIdentifierService'
    ];

    public haveService: boolean;
    public serviceUrl: string;
    public serviceDocUrl: string;
    public statusUrl: string;
    public sampleServiceUrl: string;

    private apiLocation: any;

    constructor(private $resource: any, private $location: any, private injectionVirusService: InjectionVirusService, private injectionService: InjectionService, private sampleService: SampleService,
                private neuronService: NeuronService, private tracingService: TracingService,
                private tracingNodeService: TracingNodeService, private structureIdentifierService: StructureIdentifierService) {
        this.haveService = false;
        this.serviceUrl = '';
        this.serviceDocUrl = '';
        this.statusUrl = '';
        this.sampleServiceUrl = '';

        this.apiLocation = $resource('/service', {});

        this.apiLocation.get((api, headers) => this.update(api));
    }

    private update(api) {
        this.serviceUrl = 'http://' + this.$location.host() + ':' + api.service.port + '/' + api.service.api + '/';
        this.serviceDocUrl = 'http://' + this.$location.host() + ':' + api.service.port + '/docs';
        this.statusUrl = this.$location.host() + ':' + api.status.port;
        this.sampleServiceUrl = 'http://' + this.$location.host() + ':' + api.sampleService.port + '/' + api.sampleService.api + '/';

        this.haveService = true;

        this.injectionService.setLocation(this.sampleServiceUrl);
        this.injectionVirusService.setLocation(this.sampleServiceUrl);
        this.sampleService.setLocation(this.sampleServiceUrl);
        this.neuronService.setLocation(this.sampleServiceUrl);
        this.tracingService.setLocation(this.serviceUrl);
        this.tracingNodeService.setLocation(this.serviceUrl);
        this.structureIdentifierService.setLocation(this.serviceUrl);
    }
}

angular.module('tracingManager').service('apiAccessService', ApiAccessService);

