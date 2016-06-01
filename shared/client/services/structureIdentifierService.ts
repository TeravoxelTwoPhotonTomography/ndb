/// <reference path="../../typings/globals/jquery/index.d.ts"/>
/// <reference path="../../typings/globals/angular/index.d.ts"/>
/// <reference path="../../typings/globals/angular-resource/index.d.ts" />
/// <reference path="dataService.ts" />

'use strict';

interface IStructureIdentifier extends ng.resource.IResource<IStructureIdentifier>, IApiItem {
    id: string;
    name: string;
    value: number;
    mutable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface IStructureIdentifierResource extends IDataServiceResource<IStructureIdentifier> {
}

class StructureIdentifierService extends DataService<IStructureIdentifier> {

    public static $inject = [
        '$resource'
    ];

    constructor($resource: ng.resource.IResourceService) {
        super($resource);
    }

    private get service(): IStructureIdentifierResource {
        return <IStructureIdentifierResource>this.dataSource;
    }

    protected mapQueriedItem(obj: any): IStructureIdentifier {
        obj.createdAt = new Date(obj.createdAt);
        obj.updatedAt = new Date(obj.updatedAt);

        return obj;
    }

    protected createResource(location: string): IStructureIdentifierResource {
        return <IStructureIdentifierResource>this.$resource(location + 'structures', {})
    }

    public get structures(): any {
        return this.items;
    }
}
