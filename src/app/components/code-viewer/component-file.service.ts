import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface ComponentFiles {
  [filename: string]: string;
}

interface ComponentManifest {
  [componentPath: string]: ComponentFiles;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentFileService {
  private http = inject(HttpClient);
  private manifest: ComponentManifest | null = null;
  private manifestPromise: Promise<ComponentManifest> | null = null;

  /**
   * Load component files from the pre-generated manifest
   * The manifest is built at compile time with all component source files
   * @param componentPath - Path to component (e.g., 'michael/starwars-info')
   */
  async loadComponentFiles(componentPath: string): Promise<ComponentFiles> {
    if (!this.manifest && !this.manifestPromise) {
      this.manifestPromise = this.loadManifest();
    }

    try {
      const manifest = await (this.manifestPromise || this.manifest);
      if (!manifest) {
        console.warn('No manifest available');
        return {};
      }

      // Check if component exists in manifest
      if (manifest[componentPath]) {
        return manifest[componentPath];
      }

      console.warn(`Component path not found in manifest: ${componentPath}`);
      console.warn('Available components:', Object.keys(manifest));
      return {};
    } catch (error) {
      console.error(`Error loading component files for ${componentPath}:`, error);
      return {};
    }
  }

  private async loadManifest(): Promise<ComponentManifest> {
    if (this.manifest) {
      return this.manifest;
    }

    try {
      const result = await lastValueFrom(
        this.http.get<ComponentManifest>('/component-manifest.json')
      );

      this.manifest = result || {};
      console.log('Manifest loaded successfully with components:', Object.keys(this.manifest));

      return this.manifest;
    } catch (error) {
      console.error('Error loading component manifest:', error);
      return {};
    }
  }
}
