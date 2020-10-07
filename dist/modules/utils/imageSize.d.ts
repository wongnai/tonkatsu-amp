import cacheManager from 'cache-manager'
import { ISizeCalculationResult } from 'image-size/dist/types/interface'
export declare function getImageSize(url: string): Promise<ISizeCalculationResult>
export declare function getCachedImageSize(
	url: string,
	cache: cacheManager.Cache,
): Promise<ISizeCalculationResult>
