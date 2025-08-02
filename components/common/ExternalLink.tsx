import { Link } from 'expo-router';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export function ExternalLink(props: React.ComponentProps<typeof Link>) {
  return (
    <Link
      target="_blank"
      {...Platform.select({
        web: { rel: 'noopener' },
        default: {},
      })}
      {...props}
    />
  );
} 