import {Injectable} from "@angular/core";
import {ResourceWrapper} from "../entity/generated/resourceWrapper";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class DataService {
	private resourceWrapper?: ResourceWrapper;
	private loading = true;

	constructor(private httpClient: HttpClient) {
		this.httpClient.get<ResourceWrapper>(DataService.getUrl("operation/refresh")).subscribe(data => {
			this.resourceWrapper = data;
			this.loading = false;
		});
	}

	public update() {
		if (this.resourceWrapper) {
			const resourceWrapperCopy: ResourceWrapper = JSON.parse(JSON.stringify(this.resourceWrapper));
			resourceWrapperCopy.minecraftModelResources.length = 0;
			resourceWrapperCopy.minecraftTextureResources.length = 0;
			this.httpClient.post<ResourceWrapper>(DataService.getUrl("operation/update"), resourceWrapperCopy, {headers: {"content-type": "text/plain"}}).subscribe(data => this.resourceWrapper = data);
		}
	}

	public upload(data: ResourceWrapper) {
		this.resourceWrapper = data;
	}

	public reset() {
		this.resourceWrapper = undefined;
		this.httpClient.get(DataService.getUrl("upload/reset")).subscribe();
	}

	public preview() {
		this.httpClient.get(DataService.getUrl("operation/preview")).subscribe();
	}

	public vehicles() {
		return this.resourceWrapper?.vehicles ?? [];
	}

	public models() {
		return this.resourceWrapper?.modelResources ?? [];
	}

	public textures() {
		return this.resourceWrapper?.textureResources ?? [];
	}

	public minecraftModelResources() {
		return this.resourceWrapper?.minecraftModelResources ?? [];
	}

	public minecraftTextureResources() {
		return this.resourceWrapper?.minecraftTextureResources ?? [];
	}

	public isLoading() {
		return this.loading;
	}

	public hasData() {
		return !!this.resourceWrapper;
	}

	public static getUrl(endpoint: string) {
		const pathName = document.location.pathname;
		return `${document.location.origin}${pathName.substring(0, pathName.length - 8)}mtr/api/creator/${endpoint}`;
	}
}
