import { Component, OnDestroy, NgZone } from '@angular/core';
import Peer, { DataConnection } from 'peerjs';

// PeerID prefix
const pepper = 'bloop99-';

// Generates a unique peer ID by combining a fixed string with a random component
function generatePeerId(): string {
  return pepper + Math.random().toString(36).substr(2, 5);
}

@Component({
  selector: 'app-oskar-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnDestroy {
  peerId: string = generatePeerId();
  peer: Peer | undefined;
  status: string = 'initializing';
  conn: DataConnection | undefined;
  
  private handleDataReceived(text: string) {

  }

  private handleConnStart(conn: DataConnection) {
    this.conn = conn;
    
    conn.on('data', (data: any) => {
      console.log('Received data from peer:', data);
    });
  }

  public initPeer() {
    try {
      console.log('Initializing PeerJS with id:', this.peerId);

      console.log('userAgent:', typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown');

      const turnUser = '10efec1afa1d885c331e143d';
      const turnPass = 'pBoPpusAvWMVi5zA';

      const peerJsOptions: any = {
        debug: 1,
        config: {
          // If you want to force testing of TURN-only behaviour, set to 'relay'
          // iceTransportPolicy: 'relay',
          iceServers: [
            { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
            { urls: ['turn:global.relay.metered.ca:3478'], username: turnUser, credential: turnPass },
            { urls: ['turn:global.relay.metered.ca:80?transport=tcp'], username: turnUser, credential: turnPass },
            { urls: ['turn:global.relay.metered.ca:443?transport=tcp'], username: turnUser, credential: turnPass },
            { urls: ['turns:global.relay.metered.ca:443?transport=tcp'], username: turnUser, credential: turnPass },
          ],
          sdpSemantics: 'unified-plan',
        },
      };

      this.peer = new Peer(this.peerId as any, peerJsOptions);
      // Update status inside Angular zone so change detection runs
      this.ngZone.run(() => {
        this.status = 'Waiting for connection...';
      });

    } catch (e) {
      console.error('Peer constructor threw:', e);
      return;
    }

    this.peer.on('open', (id: string) => {
      console.log('Peer event: open ->', id);
    });

    this.peer.on('connection', (conn: any) => {
      console.log('Other thing connected to me')

      // PeerJS callback runs outside Angular zone; update view inside zone
      this.ngZone.run(() => {
        this.status = 'connected';
      });

      // force dom update
      // briefly toggle a bound value to force change detection / DOM update
      const prevStatus = this.status;
      this.status = '';
      setTimeout(() => {
        this.ngZone.run(() => { this.status = prevStatus; });
      }, 0);

      this.handleConnStart(conn);
    });

    this.peer.on('disconnected', () => {
      console.warn('Peer event: disconnected');
    });

    this.peer.on('close', () => {
      console.log('closed!!!');
    });

    this.peer.on('error', (err: any) => {
      console.error('Peer event: error ->', err);
    });
  }

  constructor(private ngZone: NgZone) {
    this.initPeer();
  }

  public sendHi() {
    this.conn?.send("HI!!!")
  }

  public connectToPeer(value: string) {
    if (!this.peer) {
      console.error('Peer is not initialized');
      return;
    }

    value = "bloop99-" + value;

    const conn = this.peer.connect(value);

    this.handleConnStart(conn);

    conn.on('open', () => {
      // Update status inside Angular zone
      this.ngZone.run(() => {
        this.status = 'connected';
      });

      console.log('Connection opened to peer:', value);
    });

    
  }

  ngOnDestroy(): void {
    if (this.peer && (this.peer as any).destroy) {
      try {
        (this.peer as any).destroy();
        console.log('Peer connection destroyed');
      } catch (e) {
        console.warn('Error destroying peer:', e);
      }
    }
  }
}
